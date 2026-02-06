-- TELC B1 Leseverstehen 100-Fragen-Paket
DO $$
DECLARE
    new_test_id INTEGER;
    new_part_id INTEGER;
    new_question_id INTEGER;
BEGIN
    -- Insert main test
    INSERT INTO tests (name, short_description, description, image, weight, duration, subject_id, course_id)
    VALUES ('TELC B1 Leseverstehen 100-Fragen-Paket', 'Leseverstehen', 'Umfangreiches Training für Lese- und Detailverständnis (Teile 1-3).', '', 0.25, 120, 1, 1)
    RETURNING id INTO new_test_id;

    -- ========================================
    -- TEIL 1: Leseverstehen Teil 1 (Aufgaben 1-20)
    -- ========================================
    INSERT INTO test_parts (test_id, title, part_type) 
    VALUES (new_test_id, 'Leseverstehen Teil 1 (Aufgaben 1-20)', 'decriptionAndText') 
    RETURNING id INTO new_part_id;

    -- Descriptions (Überschriften A-W)
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, 'A', 'Programm gegen Sucht', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, 'B', 'Natur pur in der Heimat', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, 'C', 'Wassersport: Günstiger Einstieg', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, 'D', 'Bildung in Not', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, 'E', 'Digitales Lesen treibt Verkauf an', '', '', '');

    -- Question 1
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '1', '', '', 'Text über Suchtgefahren durch Koffein und Hilfsangebote.', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Programm gegen Sucht', true, 'A');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Kaffee-Importe', false, 'B');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Herzmedizin', false, 'C');

    -- Question 2
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '2', '', '', 'Text über steigende Beliebtheit von Urlaub in Deutschland.', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Billigflüge', false, 'A');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Natur pur in der Heimat', true, 'B');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Malediven-Reisen', false, 'C');

    -- Question 3
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '3', '', '', 'Text über günstige Segelkurse an Universitäten.', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Wassersport: Günstiger Einstieg', true, 'A');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Teure Jachten', false, 'B');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Studentenjobs', false, 'C');

    -- Question 4
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '4', '', '', 'Text über sinkende Anforderungen in Grundschulen.', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Bildung in Not', true, 'A');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Neue Lehrbücher', false, 'B');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Ferienplanung', false, 'C');

    -- Question 5
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '5', '', '', 'Text über den Erfolg von E-Books auf dem Buchmarkt.', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Digitales Lesen treibt Verkauf an', true, 'A');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Papier wird teurer', false, 'B');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Bibliotheken schließen', false, 'C');

    -- Questions 6-20 (placeholder - analoge Aufgaben)
    FOR i IN 6..20 LOOP
        INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
        VALUES (new_part_id, i::text, '', '', 'Analoge Aufgabe zu Themen wie: Radfahren, Kommunikation, Gesundheit, Technik.', '') 
        RETURNING id INTO new_question_id;
        INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'A', true, 'A');
        INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'B', false, 'B');
        INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'C', false, 'C');
    END LOOP;

    -- ========================================
    -- TEIL 2: Leseverstehen Teil 2 (Aufgaben 21-50)
    -- ========================================
    INSERT INTO test_parts (test_id, title, part_type) 
    VALUES (new_test_id, 'Leseverstehen Teil 2 (Aufgaben 21-50)', 'textAndMultipleChoice') 
    RETURNING id INTO new_part_id;

    -- Description (Lesetext)
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) 
    VALUES (new_part_id, '', 'Detailfragen zu langen Lesetexten über Coworking, Arbeitswelt und moderne Techniknutzung.', 'Coworking und moderne Arbeitswelt', 'Wie sich die Arbeitswelt durch Technologie verändert', '');

    -- Question 21
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '21', '', '', 'Dank moderner Technik könnten viele Menschen...', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'nur noch nachts arbeiten.', false, 'a)');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'einfach zu Hause bleiben.', true, 'b)');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'auf Computer verzichten.', false, 'c)');

    -- Question 22
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '22', '', '', 'Gabriel Moss vermietet Räume auch für Events, um...', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'neue Köche zu finden.', false, 'a)');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Geld reinzuholen.', true, 'b)');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Partys zu feiern.', false, 'c)');

    -- Question 23
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '23', '', '', 'In der NOIZE FABRIK können Gäste...', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'einmal pro Woche mitessen.', true, 'a)');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'umsonst wohnen.', false, 'b)');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Software programmieren.', false, 'c)');

    -- Question 24
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '24', '', '', 'Josha entschied sich für den Platz, weil er...', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Geld sparen wollte.', false, 'a)');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Leute kennenlernen wollte.', true, 'b)');
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'einen neuen Laptop brauchte.', false, 'c)');

    -- Questions 25-50 (placeholder)
    FOR i IN 25..50 LOOP
        INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
        VALUES (new_part_id, i::text, '', '', 'Weitere Detailfragen basierend auf Textanalysen zu Arbeitsklima, Techniknutzung und sozialen Strukturen.', '') 
        RETURNING id INTO new_question_id;
        INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Option A', false, 'a)');
        INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Option B', true, 'b)');
        INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, 'Option C', false, 'c)');
    END LOOP;

    -- ========================================
    -- TEIL 3: Leseverstehen Teil 3 (Aufgaben 51-100)
    -- ========================================
    INSERT INTO test_parts (test_id, title, part_type) 
    VALUES (new_test_id, 'Leseverstehen Teil 3 (Aufgaben 51-100)', 'descriptionAndAds') 
    RETURNING id INTO new_part_id;

    -- Situations (Descriptions)
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '51', 'Eine Freundin will Popsongs in einem Chor singen.', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '52', 'Ein junger Mensch sucht ein Natur-Praktikum in einer Kita.', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '53', 'Jemand sucht einen Nebenjob in einer Suppenküche.', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '54', 'Verkauf von selbstgebasteltem Schmuck.', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '55', 'Ausbildung zum Yogalehrer oder Meditation.', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '56', 'Hilfe bei Wohnungssuche und Behörden in Berlin.', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '57', 'Ein alter Laptop soll nicht weggeschmissen werden.', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '58', 'Ein einsamer Mann möchte zeitweise einen Hund betreuen.', '', '', '');
    INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) VALUES (new_part_id, '59', 'Suche nach einem billigen gebrauchten Computer.', '', '', '');

    -- Add remaining situations 60-100
    FOR i IN 60..100 LOOP
        INSERT INTO descriptions (test_part_id, idx, text, header, subheader, image) 
        VALUES (new_part_id, i::text, 'Weitere Zuordnungen basierend auf Anzeigen für Statisten, Kinderbetreuung und soziale Dienste.', '', '', '');
    END LOOP;

    -- Anzeigen (Questions) A-J + x
    -- Anzeige A (Gassi gehen)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige A: Gassi gehen', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '58', true, '');
    FOR i IN 51..100 LOOP
        IF i != 58 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

    -- Anzeige B (Bastler sucht Geräte)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige B: Bastler sucht Geräte', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '57', true, '');
    FOR i IN 51..100 LOOP
        IF i != 57 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

    -- Anzeige C (Move to Berlin)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige C: Move to Berlin', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '56', true, '');
    FOR i IN 51..100 LOOP
        IF i != 56 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

    -- Anzeige E (Suppenküche)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige E: Suppenküche', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '53', true, '');
    FOR i IN 51..100 LOOP
        IF i != 53 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

    -- Anzeige F (Sing Sang Song)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige F: Sing Sang Song', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '51', true, '');
    FOR i IN 51..100 LOOP
        IF i != 51 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

    -- Anzeige G (Schmuckflohmarkt)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige G: Schmuckflohmarkt', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '54', true, '');
    FOR i IN 51..100 LOOP
        IF i != 54 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

    -- Anzeige I (Yoga Lounge)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige I: Yoga Lounge', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '55', true, '');
    FOR i IN 51..100 LOOP
        IF i != 55 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

    -- Anzeige J (Kinderwald)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige J: Kinderwald', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '52', true, '');
    FOR i IN 51..100 LOOP
        IF i != 52 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

    -- Anzeige D (remaining ad with placeholder assignments)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige D', '') 
    RETURNING id INTO new_question_id;
    FOR i IN 51..100 LOOP
        INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, i = 60, '');
    END LOOP;

    -- Anzeige H (remaining ad with placeholder assignments)
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'Anzeige H', '') 
    RETURNING id INTO new_question_id;
    FOR i IN 51..100 LOOP
        INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, i = 60, '');
    END LOOP;

    -- x option (no matching ad) - for question 59
    INSERT INTO questions (test_part_id, idx, header, subheader, text, image) 
    VALUES (new_part_id, '', '', '', 'x (keine passende Anzeige)', '') 
    RETURNING id INTO new_question_id;
    INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, '59', true, '');
    FOR i IN 51..100 LOOP
        IF i != 59 THEN
            INSERT INTO answers (question_id, text, is_correct, idx) VALUES (new_question_id, i::text, false, '');
        END IF;
    END LOOP;

END $$;
