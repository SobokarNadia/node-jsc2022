import { IPaginationResponse, IQuery, IUser } from "../types";
import { ApiError } from "../errors";
import { User } from "../models";
import { s3Service } from "./s3.service";
import { UploadedFile } from "express-fileupload";

class UserService {
  public async getWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const queryStringify = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStringify.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        perPage = 5,
        sortedBy = "createdAt",
        ...searchObj
      } = queryObj;

      const skip = perPage * (page - 1);

      const users = await User.find(searchObj)
        .limit(perPage)
        .skip(skip)
        .sort(sortedBy)
        .lean();

      const totalItems = await User.count();

      return {
        page: +page,
        totalItems,
        perPage: +perPage,
        itemsFound: users.length,
        // @ts-ignore
        data: userMapper.toManyResponse(users),
      };
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id).lean();
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }

  public async update(userId: string, data: IUser): Promise<IUser> {
    try {
      return await User.findByIdAndUpdate(userId, data, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }

  public async uploadAvatar(file: UploadedFile, user: IUser): Promise<IUser> {
    try {
      if (user.avatar) {
        await s3Service.deletePhoto(user.avatar);
      }

      const uploadedFile = await s3Service.uploadPhoto(file, "user", user._id);

      return await User.findByIdAndUpdate(
        user._id,
        { avatar: uploadedFile },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }

  public async deleteAvatar(user: IUser): Promise<IUser> {
    try {
      if (!user.avatar)
        throw new ApiError("Avatar doesn't exist, anyway!", 422);

      await s3Service.deletePhoto(user.avatar);

      return await User.findByIdAndUpdate(
        user._id,
        { $unset: { avatar: "" } },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }

  public async delete(userId: string) {
    try {
      return await User.deleteOne({ _id: userId });
    } catch (e) {
      throw new ApiError(e.message, e.error);
    }
  }
}

export const userService = new UserService();
