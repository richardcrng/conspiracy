import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity, RelationId} from "typeorm";
import { DeEntity } from "../types/util-types";
import { Chapter } from "./Chapter";
import { Course } from "./Course";

@Entity()
export class Topic extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, course => course.topics)
  course: Course;

  @Column()
  topicTitle: string;

  @Column()
  description: string;

  @OneToMany(() => Chapter, chapter => chapter.topic, {
    cascade: true
  })
  chapters: Chapter[];

  @RelationId((topic: Topic) => topic.chapters)
  chapterIds: number[]

  static async createWithChapters(data: Topic): Promise<Topic> {
    const createChapters = data.chapters.map(chapter => Chapter.create(chapter))
    const createdChapters = await Promise.all(createChapters)
    const topic = await this.create({
      ...data,
      chapters: createdChapters
    })

    return topic
  }
}
