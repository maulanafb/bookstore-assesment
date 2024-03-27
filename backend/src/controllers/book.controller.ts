import express, { Request, Response, NextFunction } from "express";
import { BookService } from "../services/book.service";
import { Book } from "../entities/book.entity";

const router = express.Router();
const bookService = new BookService();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     description: Get all books from the database.
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startIndex = req.query.startIndex
      ? parseInt(req.query.startIndex as string, 10)
      : 0;
    const count = req.query.count ? parseInt(req.query.count as string, 10) : 5;
    const books: Book[] = await bookService.getAllBooks(startIndex, count);
    res.json(books);
  } catch (error) {
    next(error);
  }
});

/**
 * @swaggerr
 * /books:
 *   post:
 *     summary: Add a new book
 *     description: Add a new book to the database.
 *     parameters:
 *       - in: body
 *         name: book
 *         description: The book to add.
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             writer:
 *               type: string
 *             coverImage:
 *               type: string
 *             price:
 *               type: number
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Book created successfully
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { title, writer, coverImage, price, tags } = req.body;
  try {
    const newBook = await bookService.addBook(
      title,
      writer,
      coverImage,
      price,
      tags
    );
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     description: Get a book from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Book not found
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Similar annotations for PUT and DELETE routes

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

export default router;
