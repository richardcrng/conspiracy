import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Activity } from "./entity/Activity";
import { Lesson } from "./entity/Lesson";
import { Course } from "./entity/Course";
import { Chapter } from "./entity/Chapter";
import { DeEntity } from './types/util-types';
import { Topic } from "./entity/Topic";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes

    await Course.delete({})

    app.post('/courses', async (req, res) => {
      // const datum: Course = req.body
      // datum
      

      try {
        const course = await Course.createWithTopics(req.body)
        // const [course] = await Course.create(req.body)
        await course.save()
        res.status(201).json({
          status: 'success',
          message: 'Course created',
          data: course
        })
      } catch (err) {
        res.json({
          status: 'fail',
          error: err
        })
      }
    })

    app.get('/courses', async (req, res) => {
      const allCourses = await Course.find({})
      res.json({
        status: 'success',
        data: allCourses
      })
    })

    app.get('/topics', async (req, res) => {
      const allTopics = await Topic.find({})
      res.json({
        status: 'success',
        data: allTopics
      })
    })

    app.get('/chapters', async (req, res) => {
      const allChapters = await Chapter.find({})
      res.json({
        status: 'success',
        data: allChapters
      })
    })
    
    app.get('/activities', async (req, res) => {
      const allActivities = await Activity.find({})
      res.json({
        status: 'success',
        data: allActivities
      })
    })

    // start express server
    app.listen(8080, () => {
      console.log("Express server has started on port 8080. Open http://localhost:8080/activities to see results");
    });


}).catch(error => console.log(error));
