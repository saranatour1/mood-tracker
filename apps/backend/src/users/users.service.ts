
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  async createOne(user:User):Promise<User>{
    // Todo: validate the user maybe?
    return this.usersRepository.create(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async updateOne(user:User): Promise<void> {
    const userObj = await this.findOne(user.id);
    if(!userObj){
        throw new Error("user not found")
    }
    await this.usersRepository.update(user.id, user);
  } 

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
