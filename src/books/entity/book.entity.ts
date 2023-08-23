import { User } from 'src/users/entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column()
  coverImage: string;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
