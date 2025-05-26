SELECT e.title, e.start_date
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
JOIN Users u ON r.user_id = u.user_id
WHERE e.status = 'upcoming' AND u.city = e.city AND u.user_id = [USER_ID]
ORDER BY e.start_date;
