import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column('text')
  name: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: string;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: string;
}
