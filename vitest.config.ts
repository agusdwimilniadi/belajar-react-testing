import { defineConfig } from 'vitest/config'


export default defineConfig({
    test:{
        environment:'jsdom',
        globals: true,
        setupFiles:"test/setup.ts",
        coverage:{
            provider: 'istanbul', // atau 'istanbul', tapi defaultnya c8
            reportsDirectory: './coverage', // direktori untuk menyimpan laporan coverage
            reporter: ['text', 'html'], // format laporan coverage
            all: true, // mencakup semua file, bukan hanya yang diimport di test
        }
    },
});