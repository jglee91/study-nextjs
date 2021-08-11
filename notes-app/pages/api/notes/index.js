import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const notes = await Note.find();
        res.status(200).json({ notes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'something went wrong...' });
      }
      break;

    case 'POST':
      try {
        const note = await Note.create(req.body);
        res.status(201).json({ note });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong...' });
      }
      break;

    default:
      res.status(405).json({ message: 'not allowed method' });
  }
};
