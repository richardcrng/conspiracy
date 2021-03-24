import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity, RelationId} from "typeorm";
import { Activity } from "./Activity";
import { Chapter } from "./Chapter";

@Entity()
export class Lesson extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chapter, chapter => chapter.lessons)
  chapter: Chapter

  @Column()
  lessonTitle: string;

  @OneToMany(() => Activity, activity => activity.lesson, {
    cascade: true
  })
  activities: Activity[];

  @RelationId((lesson: Lesson) => lesson.activities)
  activityIds: number[]

  static async createWithActivities(data: Lesson): Promise<Lesson> {
    const createActivities = data.activities.map(activity => Activity.create(activity))
    const createdActivities = await Promise.all(createActivities)
    const lesson = await this.create({
      ...data,
      activities: createdActivities
    })

    return lesson
  }
}
