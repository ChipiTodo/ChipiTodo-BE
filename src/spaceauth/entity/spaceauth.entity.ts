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
  @ManyToOne(() => User, (user) => user.spaceAuth)
  @PrimaryColumn('uuid')
  @JoinColumn()
  userId: User;

  @ManyToOne(() => Space, (space) => space.spaceAuth)
  @PrimaryColumn('integer')
  @JoinColumn()
  spaceId: Space;

  @Column({ type: 'enum', enum: SpaceRole })
  role: SpaceRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
