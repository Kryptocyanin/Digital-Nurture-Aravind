SELECT e.event_id, e.title, COUNT(r.registration_id) as registration_count
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.event_id
ORDER BY registration_count DESC

