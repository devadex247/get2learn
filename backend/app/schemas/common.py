from pydantic import BaseModel, ConfigDict, Field


class ApiMessage(BaseModel):
    message: str


class Pagination(BaseModel):
    page: int = Field(ge=1)
    page_size: int = Field(ge=1, le=100)
    total: int


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
