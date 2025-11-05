-- Create tables for the boardly application
CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    min_players INT DEFAULT 1,
    max_players INT DEFAULT 8,
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
INSERT INTO games (name, description, min_players, max_players) VALUES 
('Catan', 'A strategy game about building settlements on an island', 3, 4),
('Monopoly', 'Classic property trading game', 2, 6),
('Risk', 'Global domination strategy game', 2, 6),
('Scrabble', 'Word formation board game', 2, 4);

INSERT INTO game_sessions (game_id, session_date, players_count, notes) VALUES
(1, '2025-11-01', 4, 'Great game with friends'),
(2, '2025-11-02', 3, 'Quick game night'),
(1, '2025-11-03', 3, 'Teaching new players');
