import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, RelationId} from "typeorm";
import { Topic } from "./Topic";

@Entity()
export class Course extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseTitle: string;

  @Column()
  description: string;

  @OneToMany(() => Topic, topic => topic.course, {
    cascade: true
  })
  topics: Topic[];

  @RelationId((course: Course) => course.topics)
  topicIds: number[]

  static async createWithTopics(data: Course): Promise<Course> {
    const createTopics = data.topics.map(topic => Topic.createWithChapters(topic))
    const createdTopics = await Promise.all(createTopics)
    console.log(createdTopics)
    const topic = await this.create({
      ...data,
      topics: createdTopics
    })

    return topic
  }

  toObject() {
    const {
      id,
      courseTitle,
      description,
      topicIds
    } = this

    return { id, courseTitle, description, topicIds }
  }
}

export type CoursePOJO = ReturnType<Course['toObject']>
