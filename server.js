import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);



// Ejemplo de endpoint para probar conexión
app.post('/perfiles', async (req, res) => {
  const { nombre, correo, telefono } = req.body;

  try {
    const { data, error } = await supabase
      .from('perfiles')
      .insert([{ nombre, correo, telefono }])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      perfil: data[0],
      message: 'Perfil creado con éxito'
    });
  } catch (e) {
    console.error('Error en /perfiles:', e);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/perfil/:correo', async (req, res) => {
  const correo = req.params.correo;

  try {
    const { data, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('correo', correo)
      .limit(1)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.status(200).json({ perfil: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
