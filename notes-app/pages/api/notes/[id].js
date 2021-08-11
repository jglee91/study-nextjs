import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const note = await Note.findById(id);

        if (!note) {
          return res.status(400).json({ message: 'the note is not found' });
        }

        res.status(200).json({ note });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'something went wrong...' });
      }
      break;

    case 'PUT':
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!note) {
          return res.status(400).json({ message: 'the note is not found' });
        }

        res.status(200).json({ note });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'something went wrong...' });
      }
      break;

    case 'DELETE':
      try {
        const deletedNote = await Note.deleteOne({ _id: id });

        if (!deletedNote) {
          return res.status(400).json({ message: 'the note is not found' });
        }

        res.status(200).send();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'something went wrong...' });
      }
      break;

    default:
      res.status(405).json({ message: 'not allowed method' });
  }
};
