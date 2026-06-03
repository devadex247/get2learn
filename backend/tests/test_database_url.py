import unittest

from app.db.doctor import inspect_database_url, mask_database_url
from app.db.session import database_url_for_engine, is_transaction_pooler_url


SESSION_POOLER_URL = (
    "postgresql+asyncpg://postgres.projectref:secret@"
    "aws-0-region.pooler.supabase.com:5432/postgres"
)
TRANSACTION_POOLER_URL = (
    "postgresql+asyncpg://postgres.projectref:secret@"
    "aws-0-region.pooler.supabase.com:6543/postgres"
)


class DatabaseUrlTests(unittest.TestCase):
    def test_session_pooler_does_not_force_prepared_statement_cache_param(self) -> None:
        engine_url = database_url_for_engine(SESSION_POOLER_URL)

        self.assertFalse(is_transaction_pooler_url(SESSION_POOLER_URL))
        self.assertNotIn("prepared_statement_cache_size", engine_url)

    def test_transaction_pooler_disables_prepared_statement_cache(self) -> None:
        engine_url = database_url_for_engine(TRANSACTION_POOLER_URL)

        self.assertTrue(is_transaction_pooler_url(TRANSACTION_POOLER_URL))
        self.assertIn("prepared_statement_cache_size=0", engine_url)

    def test_existing_query_params_are_preserved(self) -> None:
        url = f"{TRANSACTION_POOLER_URL}?ssl=require"
        engine_url = database_url_for_engine(url)

        self.assertIn("ssl=require", engine_url)
        self.assertIn("prepared_statement_cache_size=0", engine_url)

    def test_password_is_masked_in_doctor_output(self) -> None:
        safe_url = mask_database_url(TRANSACTION_POOLER_URL)

        self.assertIn("postgres.projectref:***@", safe_url)
        self.assertNotIn("secret", safe_url)

    def test_doctor_report_flags_supabase_transaction_pooler(self) -> None:
        report = inspect_database_url(TRANSACTION_POOLER_URL)

        self.assertTrue(report.is_supabase)
        self.assertTrue(report.uses_pooler)
        self.assertTrue(report.looks_transaction_pooler)
        self.assertTrue(report.disables_prepared_statement_cache)


if __name__ == "__main__":
    unittest.main()
