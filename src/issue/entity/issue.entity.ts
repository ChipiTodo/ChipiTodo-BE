import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Priority } from '../enum/priority.enum';
import { Progress } from '../enum/progress.enum';
import { Size } from '../enum/size.enum';
import { User } from 'src/user/entity/user.entity';
import { Space } from 'src/space/entity/space.entity';
import { Comment } from 'src/comment/entity/comment.entity';
import { BaseModel } from 'src/common/model/basemodel';

@Entity()
export class Issue extends BaseModel {
  constructor() {
    super();
  }

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

  @Column({ type: 'text', nullable: true })
  content?: string;

  @OneToMany(() => Comment, (comment) => comment.issue)
  comment: Comment[];
}
