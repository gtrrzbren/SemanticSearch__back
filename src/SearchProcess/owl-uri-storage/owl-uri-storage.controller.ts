import { Controller } from '@nestjs/common';
import { OwlUriStorageService } from './owl-uri-storage.service';

@Controller('owl-uri-storage')
export class OwlUriStorageController {
  constructor(private readonly owlUriStorageService: OwlUriStorageService) {}
}
