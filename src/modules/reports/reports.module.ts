import { Module } from '@nestjs/common';
import { ReportsResolver } from './resolvers/report.resolver';
import { ReportService } from './services/report.service';

@Module({
  providers: [ReportService, ReportsResolver],
})
export class ReportsModule {}
