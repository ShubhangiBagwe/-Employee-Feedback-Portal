# Employee Feedback Portal

## How to Run

1. Clone the repo
2. Navigate to `/backend` and run:
   - `npm install`
   - Add `.env` with `MONGO_URI=your_mongo_connection`
   - `node app.js`
3. Navigate to `/frontend` and run:
   - `npm install`
   - `npm run dev`

## API Endpoints

- `POST /feedback`: Submit feedback
- `GET /feedback`: Get all feedback
- `GET /feedback?category=xyz`: Get feedback by category
- `PATCH /feedback/:id/reviewed`: Mark feedback reviewed
- `DELETE /feedback/:id`: Delete feedback

## Assumptions

- No authentication for admin/employee
- Data is stored anonymously
- Admin UI is not protected 

## Status

- Submit Feedback
- Filter Feedback
- Mark as Reviewed
- Delete Feedback
- Basic Styling

