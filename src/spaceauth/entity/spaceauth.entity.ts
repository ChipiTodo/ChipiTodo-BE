import { Space } from 'src/space/entity/space.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SpaceRole } from '../enum/spacerole.enum';

@Entity()
export class SpaceAuth {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn()
  spaceId: number;

  @ManyToOne(() => User, (user) => user.spaceAuth)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Space, (space) => space.spaceAuth)
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  space: Space;

  @Column({ type: 'enum', enum: SpaceRole })
  role: SpaceRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
