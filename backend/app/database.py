from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite database (simple file DB)
DATABASE_URL = "sqlite:///./findefender.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# 🔥 THIS is what your app is missing
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
