import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity, RelationId} from "typeorm";
import { Lesson } from "./Lesson";
import { Topic } from './Topic';

@Entity()
export class Chapter extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Topic, topic => topic.chapters)
  topic: Topic

  @Column()
  chapterTitle: string;

  @OneToMany(() => Lesson, lesson => lesson.chapter, {
    cascade: true
  })
  lessons: Lesson[];

  @RelationId((chapter: Chapter) => chapter.lessons)
  lessonIds: number[]

  static async createWithLessons(data: Chapter): Promise<Chapter> {
    const createLessons = data.lessons.map(lesson => Lesson.createWithActivities(lesson))
    const createdLessons = await Promise.all(createLessons)
    const chapter = await this.create({
      ...data,
      lessons: createdLessons
    })

    return chapter
  }
}
