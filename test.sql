## 바비톡 SQL Test



-- WITH rn AS (
--     SELECT
--         id,
--         num,
--         ROW_NUMBER() OVER (PARTITION BY num) AS rn
--     FROM Logs
-- )

-- SELECT DISTINCT num AS ConsecutiveNums
-- FROM rn
-- WHERE rn = 3
-- ;



SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1 
    JOIN Logs l2 ON l1.id = l2.id + 1
    JOIN Logs l3 ON l2.id = l3.id + 1
WHERE l1.num = l2.num AND l2.num = l3.num
;



/*

+----+-----+-----+-----+
| l1.id | l1.num | l2.id | l2.num | l3.id | l3.num
+----+-----+-----+-----+
| 1  | 1   | null  | null | null | null
| 2  | 1   | 1   | 1 | null | null
| 3  | 1   | 2   | 1 | 1 | 1
| 4  | 2   | 3   | 1 | 2 | 1
| 5  | 1   | 4   | 2 | 3 | 1
| 6  | 2   | 5   | 1 | 4 | 2
| 7  | 2   | 6   | 2 | 5 | 1
+----+-----+


*/





SELECT 
    t.request_at AS Day,
    ROUND(SUM(
        CASE WHEN t.status IN ('cancelled_by_driver', 'cancelled_by_client') THEN 1 ELSE 0 END
    ) / COUNT(*), 2) AS `Cancellation Rate`
FROM Trips t 
    JOIN Users u1 ON t.Client_Id = u1.Users_Id AND u1.banned = 'No'
    JOIN Users u2 ON t.Driver_Id = u2.Users_Id AND u2.banned = 'No'
WHERE 
    t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at
;




