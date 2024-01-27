import { Comment } from 'src/comment/entity/comment.entity';
import { Issue } from 'src/issue/entity/issue.entity';
import { SpaceAuth } from 'src/spaceauth/entity/spaceauth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true }) // OAuth를 위해 비밀번호 null 가능
  password?: string;

  @Column()
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SpaceAuth, (spaceAuth) => spaceAuth.user, {
    cascade: true,
  })
  spaceAuth: SpaceAuth[];

  @OneToMany(() => Issue, (issue) => issue.user, {
    cascade: true,
  })
  issue: Issue[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comment: Comment[];
}
