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
export class Space {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SpaceAuth, (spaceAuth) => spaceAuth.space, { cascade: true })
  spaceAuth: SpaceAuth[];

  @OneToMany(() => Issue, (issue) => issue.space, { cascade: true })
  issue: Issue[];
}
