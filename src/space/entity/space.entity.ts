import { IsNotEmpty, IsString } from 'class-validator';
import { BaseModel } from 'src/common/model/basemodel';
import { Issue } from 'src/issue/entity/issue.entity';
import { SpaceAuth } from 'src/spaceauth/entity/spaceauth.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Space extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => SpaceAuth, (spaceAuth) => spaceAuth.space, { cascade: true })
  spaceAuth: SpaceAuth[];

  @OneToMany(() => Issue, (issue) => issue.space, { cascade: true })
  issue: Issue[];
}
