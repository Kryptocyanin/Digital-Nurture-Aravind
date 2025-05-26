SELECT registration_date, COUNT(user_id) as user_count
FROM Users
WHERE registration_date >= DATE('now', '-7 days')
GROUP BY registration_date;
