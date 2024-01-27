import { Space } from 'src/space/entity/space.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { SpaceRole } from '../enum/spacerole.enum';
import { BaseModel } from 'src/common/model/basemodel';

@Entity()
export class SpaceAuth extends BaseModel {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn()
  spaceId: number;

  @ManyToOne(() => User, (user) => user.spaceAuth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Space, (space) => space.spaceAuth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  space: Space;

  @Column({ type: 'enum', enum: SpaceRole })
  role: SpaceRole;
}
