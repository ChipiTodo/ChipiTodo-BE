import { BaseModel } from 'src/common/model/basemodel';
import { Issue } from 'src/issue/entity/issue.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.comment, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Issue, (issue) => issue.comment, { onDelete: 'CASCADE' })
  issue: Issue;
}
