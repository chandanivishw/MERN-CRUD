import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String },
  class: { type: Number },
  age: { type: String },
});

const StudentsData =
  mongoose.models.Students || mongoose.model('Students', StudentSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  const uri = Netlify.env.get('MONGO_URI');
  if (!uri) throw new Error('MONGO_URI environment variable is not set');
  await mongoose.connect(uri);
}

export default async (req) => {
  try {
    await connectDB();
  } catch (err) {
    return Response.json({ error: 'Database connection failed' }, { status: 500 });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api/, '');
  const method = req.method;

  try {
    // GET /api/students
    if (path === '/students' && method === 'GET') {
      const students = await StudentsData.find({});
      return Response.json(students);
    }

    // POST /api/students
    if (path === '/students' && method === 'POST') {
      const body = await req.json();
      const student = new StudentsData(body);
      const saved = await student.save();
      return Response.json(saved, { status: 201 });
    }

    // /api/students/:id routes
    const match = path.match(/^\/students\/([^/]+)$/);
    if (match) {
      const id = match[1];

      if (method === 'GET') {
        const student = await StudentsData.findById(id);
        if (!student) return Response.json({ error: 'Not found' }, { status: 404 });
        return Response.json(student);
      }

      if (method === 'PUT') {
        const body = await req.json();
        const updated = await StudentsData.findByIdAndUpdate(id, body, { new: true });
        return Response.json(updated);
      }

      if (method === 'DELETE') {
        const deleted = await StudentsData.findByIdAndDelete(id);
        return Response.json(deleted);
      }
    }

    return new Response('Not Found', { status: 404 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};

export const config = {
  path: ['/api', '/api/*'],
};
