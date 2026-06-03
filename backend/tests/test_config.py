import unittest

from app.core.config import Settings


class SettingsTests(unittest.TestCase):
    def test_cors_origins_support_comma_separated_values(self) -> None:
        settings = Settings(
            backend_cors_origins="http://localhost:5500, https://get2learn.vercel.app"
        )

        self.assertEqual(
            settings.cors_origins,
            ["http://localhost:5500", "https://get2learn.vercel.app"],
        )

    def test_cors_origins_support_json_array_values(self) -> None:
        settings = Settings(
            backend_cors_origins='["http://localhost:5500", "https://get2learn.vercel.app"]'
        )

        self.assertEqual(
            settings.cors_origins,
            ["http://localhost:5500", "https://get2learn.vercel.app"],
        )

    def test_blank_prepared_statement_cache_size_becomes_none(self) -> None:
        settings = Settings(db_prepared_statement_cache_size="")

        self.assertIsNone(settings.db_prepared_statement_cache_size)


if __name__ == "__main__":
    unittest.main()
