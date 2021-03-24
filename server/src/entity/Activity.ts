import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { Lesson } from "./Lesson";

export enum ActivityType {
    READ = "read",
    SELECT_AN_ANSWER = "select-an-answer",
    SELECT_FOR_EACH_BLANK = 'select-for-each-blank',
    SELECT_MULTIPLE = 'select-multiple',
    SWIPE_CARDS = 'swipe-cards'
}

export type ActivityBlock = string

export type AnswerFeedback = string | {
  header?: string,
  message: string,
  buttonText?: string
}

export type Answer = {
  text: string
  isCorrect: boolean
  feedback?: AnswerFeedback
  isSelected?: boolean
}

export type SwipeCard = {
  text: string,
  isRight: boolean,
  feedbackCorrect?: AnswerFeedback,
  feedbackNotCorrect?: AnswerFeedback
}

// export type ActivityType = 'read'
//   | 'select-an-answer'
//   | 'select-for-each-blank'
//   | 'select-multiple'
//   | 'swipe-cards'

@Entity()
export class Activity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, lesson => lesson.activities)
  lesson: Lesson

  @Column({
      type: "enum",
      enum: ActivityType,
      default: ActivityType.READ
  })
  activityType: ActivityType;

  @Column({
    type: 'jsonb',
    default: []
  })
  blocks: ActivityBlock[];

  @Column({
    type: 'jsonb',
    default: [],
    nullable: true
  })
  answers: Answer[];

  @Column({
    type: 'jsonb',
    default: [],
    nullable: true
  })
  cards: SwipeCard[]
}
