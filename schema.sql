-- Create tables for the boardly application
CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    session_date DATE NOT NULL,
    players_count INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO games (name) VALUES 
('Catan'),
('Monopoly'),
('Risk'),
('Scrabble');

INSERT INTO game_sessions (game_id, session_date, players_count, notes) VALUES
(1, '2025-11-01', 4, 'Great game with friends'),
(2, '2025-11-02', 3, 'Quick game night'),
(1, '2025-11-03', 3, 'Teaching new players');
