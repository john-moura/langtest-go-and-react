DELETE FROM answers WHERE question_id IN (SELECT id FROM questions WHERE test_part_id IN (SELECT id FROM test_parts WHERE test_id IN (SELECT id FROM tests WHERE name LIKE 'Reading Test %')));
DELETE FROM questions WHERE test_part_id IN (SELECT id FROM test_parts WHERE test_id IN (SELECT id FROM tests WHERE name LIKE 'Reading Test %'));
DELETE FROM descriptions WHERE test_part_id IN (SELECT id FROM test_parts WHERE test_id IN (SELECT id FROM tests WHERE name LIKE 'Reading Test %'));
DELETE FROM test_parts WHERE test_id IN (SELECT id FROM tests WHERE name LIKE 'Reading Test %');
DELETE FROM tests WHERE name LIKE 'Reading Test %';
