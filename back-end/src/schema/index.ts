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
