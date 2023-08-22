import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';
import {
  Httpx,
  Request,
  Get,
  Post,
} from 'https://jslib.k6.io/httpx/0.0.2/index.js';
import {
  randomIntBetween,
  randomItem,
} from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
  thresholds: {
    checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};

let session = new Httpx({ baseURL: 'http://localhost:3000' });
export default function () {
  describe('API uptime check', (t) => {
    const response = session.get('');
    t.expect(response.status).as('response status').toEqual(200);
  });

  let data = {
    title: 'k6 test',
    desc: 'k6 desc',
    duration: 120,
    instructorId: 1,
    beginner: true,
  };
  describe('Create a Course', (t) => {
    const response = session.post(
      'http://localhost:3000/course',
      JSON.stringify(data),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    t.expect(response.status)
      .as('status')
      .toEqual(201)
      .and(response)
      .toHaveValidJson();
  });
  group('Get courses', (t) => {
    let responses = session.batch(
      [
        new Get('/course/1001'),
        new Get('/course/1002'),
        new Get('/course/1003'),
        new Get('/course/1004'),
      ],
      {
        tags: { name: 'Course' },
      },
    );

    responses.forEach((response) => {
      t.expect(response.status)
        .as('response status')
        .toEqual(200)
        .and(response)
        .toHaveValidJson()
        .and(response.json('id'))
        .as('course id')
        .toBeGreaterThan(7);
    });
  });
}
