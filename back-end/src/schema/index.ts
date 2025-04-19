import { sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgSequence,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const milestonesIdSeq = pgSequence('milestones_id_seq');
export const todosIdSeq = pgSequence('todos_id_seq');
export const restaurantsIdSeq = pgSequence('restaurants_id_seq');
export const expensesIdSeq = pgSequence('expenses_id_seq');
export const expenseCategoriesIdSeq = pgSequence('expense_categories_id_seq');
export const expenseMonthlyIdSeq = pgSequence('expense_monthly_id_seq');

export const milestones = pgTable('milestones', {
  id: integer('id')
    .primaryKey()
    .notNull()
    .default(sql`nextval('milestones_id_seq')`),
  title: text('title').notNull(),
  date: timestamp('date').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  location: text('location'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const todos = pgTable('todos', {
  id: integer('id')
    .primaryKey()
    .notNull()
    .default(sql`nextval('todos_id_seq')`),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: timestamp('dueDate').default(null),
  completed: boolean('completed').notNull().default(false),
  priority: integer('priority'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const restaurants = pgTable('restaurants', {
  id: integer('id')
    .primaryKey()
    .notNull()
    .default(sql`nextval('restaurants_id_seq')`),
  name: text('name').notNull(),
  address: text('address'),
  cuisine: text('cuisine'),
  notes: text('notes'),
  image: text('image'),
  visited: boolean('visited').default(false),
  rating: integer('rating'),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const expenseCategories = pgTable('expense_categories', {
  id: integer('id')
    .primaryKey()
    .notNull()
    .default(sql`nextval('expense_categories_id_seq')`),
  name: text('name').notNull(),
  code: text('code').notNull().unique(),
  maximumAmount: integer('maximum_amount').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const expenseMonthly = pgTable('expense_monthly', {
  id: integer('id')
    .primaryKey()
    .notNull()
    .default(sql`nextval('expense_monthly_id_seq')`),
  amount: integer('amount').notNull(),
  time: text('time').notNull(),
  categoryId: integer('category_id')
    .references(() => expenseCategories.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const expenses = pgTable('expenses', {
  id: integer('id')
    .primaryKey()
    .notNull()
    .default(sql`nextval('expenses_id_seq')`),
  date: timestamp('date').notNull(),
  amount: integer('amount').notNull(),
  monthlyId: integer('monthly_id')
    .references(() => expenseMonthly.id)
    .notNull(),
  description: text('description'),
  categoryId: integer('category_id')
    .references(() => expenseCategories.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
