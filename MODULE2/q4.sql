SELECT e.event_id, e.title, COUNT(s.session_id) as session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
WHERE start_time('%H', s.start_time) BETWEEN '10' AND '12'
GROUP BY e.event_id;
