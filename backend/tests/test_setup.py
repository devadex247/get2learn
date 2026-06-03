import unittest
from unittest.mock import Mock, patch

from app.db import setup


class DatabaseSetupTests(unittest.IsolatedAsyncioTestCase):
    async def test_setup_refuses_local_database_url(self) -> None:
        with patch("app.db.setup.get_settings") as get_settings:
            get_settings.return_value = Mock(
                database_url="postgresql+asyncpg://postgres:postgres@localhost:5432/get2learn"
            )

            with self.assertRaises(SystemExit) as context:
                await setup.main()

        self.assertIn("local Postgres", str(context.exception))

    def test_run_migrations_upgrades_to_head(self) -> None:
        with patch("app.db.setup.Config") as config, patch("app.db.setup.command.upgrade") as upgrade:
            setup.run_migrations()

        config.assert_called_once_with("alembic.ini")
        upgrade.assert_called_once_with(config.return_value, "head")


if __name__ == "__main__":
    unittest.main()
