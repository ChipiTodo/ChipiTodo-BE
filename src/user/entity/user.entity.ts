import { Comment } from 'src/comment/entity/comment.entity';
import { BaseModel } from 'src/common/model/basemodel';
import { Issue } from 'src/issue/entity/issue.entity';
import { SpaceAuth } from 'src/spaceauth/entity/spaceauth.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true }) // OAuth를 위해 비밀번호 null 가능
  password?: string;

  @Column()
  nickname: string;

  @OneToMany(() => SpaceAuth, (spaceAuth) => spaceAuth.user, {
    cascade: true,
  })
  spaceAuth?: SpaceAuth[];

  @OneToMany(() => Issue, (issue) => issue.user, {
    cascade: true,
  })
  issue?: Issue[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comment?: Comment[];
}
