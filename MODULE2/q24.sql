SELECT e.event_id, e.title,
       AVG((julianday(s.end_time) - julianday(s.start_time)) * 24 * 60) as avg_duration_minutes
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id;
