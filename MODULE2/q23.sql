SELECT strftime('%Y-%m', registration_date) as month, COUNT(registration_id) as registration_count
FROM Registrations
WHERE registration_date >= DATE('now', '-12 months')
GROUP BY month;
