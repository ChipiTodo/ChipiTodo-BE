import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Priority } from '../enum/priority.enum';
import { Progress } from '../enum/progress.enum';
import { Size } from '../enum/size.enum';
import { User } from 'src/user/entity/user.entity';
import { Space } from 'src/space/entity/space.entity';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.issue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Space, (space) => space.issue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  space: Space;

  @Column()
  title: string;

  @Column({ type: 'timestamp' })
  todoDay: Date;

  @Column({ type: 'timestamp', nullable: true })
  startDay?: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDay?: Date;

  @Column({ type: 'enum', enum: Priority, nullable: true })
  priority?: Priority;

  @Column({ type: 'enum', enum: Progress, nullable: true })
  progress?: Progress;

  @Column({ type: 'enum', enum: Size, nullable: true })
  size?: Size;

  @Column({ type: 'boolean' })
  complete: boolean;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
