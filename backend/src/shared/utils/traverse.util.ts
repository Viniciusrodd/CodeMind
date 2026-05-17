
// imports
import { parse } from "@babel/parser";
import traverse from '@babel/traverse';
import * as t from "@babel/types";

// import interfaces
import { Chunk } from "@rag/interfaces/rag.interface";


export const traverseCode = (content: string): Chunk[] => {
   
   // properties
   const chunks: Chunk[] = [];
   let chunkIndex = 0;

   // AST setup
   const AST = parse(content, {
      sourceType: 'module',
      plugins: [
         'typescript',
         'jsx',
         'classProperties',
         'decorators-legacy'
      ]
   });


   traverse(AST, {
      // class declaration
      ClassDeclaration(path) {
         const node = path.node;

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: chunkContent.length,
               type: 'class',
               name: node.id?.name!
            }
         });
      },

      // class methods
      ClassMethod(path) {
         const node = path.node;
         let parentName: string | undefined;

         const parentClass = path.findParent(parent => parent.isClassDeclaration());
         if(parentClass?.node && t.isClassDeclaration(parentClass.node)){
            parentName = parentClass?.node.id?.name;
         }

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         let methodName = 'anonymous';
         if(t.isIdentifier(node.key)) methodName = node.key.name;

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: chunkContent.length,
               type: 'method',
               name: methodName!,
               parent: parentName!
            }
         });
      },

      // function declaration
      FunctionDeclaration(path) {
         const node = path.node;

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: chunkContent.length,
               type: 'function',
               name: node.id?.name!
            }
         });
      },

      // variable/arrow function
      VariableDeclarator(path) {
         const node = path.node;

         if(t.isArrowFunctionExpression(node.init) || t.isFunctionExpression(node.init)){
            const chunkContent = content.slice(
               node.start!,
               node.end!
            );

            chunks.push({
               content: chunkContent,
               metadata: {
                  chunkIndex: chunkIndex++,
                  tokens: chunkContent.length,
                  type: 'function',
                  name: t.isIdentifier(node.id) ? node.id.name : 'anonymous'
               }
            });
         }
      },

      // ts interface
      TSInterfaceDeclaration(path) {
         const node = path.node;

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: chunkContent.length,
               type: 'interface',
               name: node.id.name!
            }
         });
      },

      // ts type
      TSTypeAliasDeclaration(path) {
         const node = path.node;

         const chunkContent = content.slice(
            node.start!,
            node.end!
         );

         chunks.push({
            content: chunkContent,
            metadata: {
               chunkIndex: chunkIndex++,
               tokens: chunkContent.length,
               type: 'type',
               name: node.id.name!
            }
         });
      }
   });

   return chunks;

};