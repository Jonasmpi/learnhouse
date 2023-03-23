from uuid import uuid4
from pydantic import BaseModel
import os
from fastapi import HTTPException, status, UploadFile, Request
from fastapi.responses import StreamingResponse
from src.services.blocks.schemas.blocks import Block
from src.services.blocks.utils.upload_files import upload_file_and_return_file_object

from src.services.users.users import PublicUser


async def create_video_block(request: Request, video_file: UploadFile, lecture_id: str):
    blocks = request.app.db["blocks"]
    lecture = request.app.db["lectures"]

    block_type = "videoBlock"
    # get org_id from lecture
    lecture = await lecture.find_one({"lecture_id": lecture_id}, {"_id": 0, "org_id": 1})
    org_id = lecture["org_id"]

    # get block id
    block_id = str(f"block_{uuid4()}")

    block_data = await upload_file_and_return_file_object(request, video_file,  lecture_id, block_id, ["mp4", "webm", "ogg"], block_type)

    # create block
    block = Block(block_id=block_id, lecture_id=lecture_id,
                  block_type=block_type, block_data=block_data, org_id=org_id)

    # insert block
    await blocks.insert_one(block.dict())

    return block


async def get_video_block(request: Request, file_id: str, current_user: PublicUser):
    photos = request.app.db["blocks"]

    video_block = await photos.find_one({"block_id": file_id})

    if video_block:
        return Block(**video_block)

    else:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Photo file does not exist")
