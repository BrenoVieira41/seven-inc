import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createEmployees1605344557649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table ({
        name: 'employees',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'bornDate',
            type: 'date',
          },
          {
            name: 'salary',
            type: 'money',
          },
          {
            name: 'position',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ]
      }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('employees')
    }

}
