import { TestBed } from '@angular/core/testing';
import { StudioPipe } from './studio.pipe';
import { Hero } from '../models/hero.model.';



describe('Universe Pipe', () => {
    const mockHeroes: Hero[] = [
        {id: 1 , name: 'Thor' , universe: 'Marvel'},
        {id: 2 , name: 'Batman' , universe: 'DC'}
    ]
    it('Pipe should work correctly for Marvel choose', (done) => {
        expect(new StudioPipe().transform(mockHeroes, 'Marvel')).toEqual([{id: 1, name: 'Thor', universe: 'Marvel'}]);
        done();
    });

    it('Pipe should work correctly for DC choose', (done) => {
        expect(new StudioPipe().transform(mockHeroes, 'DC')).toEqual([{id: 2, name: 'Batman', universe: 'DC'}]);
        done();
    });

    it('Pipe should return heroes if search is empty' , (done) => {
        expect(new StudioPipe().transform(mockHeroes)).toEqual(mockHeroes);
        done();
    });

});
