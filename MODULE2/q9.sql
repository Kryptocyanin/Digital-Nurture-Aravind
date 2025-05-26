SELECT u.user_id, u.full_name,
       COUNT(e.event_id) as event_count,
       SUM(CASE WHEN e.status = 'upcoming' THEN 1 ELSE 0 END) as upcoming_count,
       SUM(CASE WHEN e.status = 'completed' THEN 1 ELSE 0 END) as completed_count,
       SUM(CASE WHEN e.status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_count
FROM Users u
LEFT JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id;
